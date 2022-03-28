using FireSharp;
using FireSharp.Config;
using FireSharp.Interfaces;
using KwansoTest.Models;
using KwansoTest.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace KwansoTest.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly AppContext _context;
        private readonly IConfiguration _configuration;
        private readonly JwtTokenConfig _jwtTokenConfig;

        public WeatherForecastController(AppContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
            _jwtTokenConfig = _configuration.GetSection("jwtTokenConfig").Get<JwtTokenConfig>();
        }

        [Authorize]
        [HttpGet]
        [Route("List")]
        public async Task<ActionResult<IEnumerable<TaskModel>>> Get()
        {
            return await _context.Tasks.Where(x => x.IsDeleted == false).ToListAsync();
        }

        [Authorize]
        [HttpPost]
        [Route("add-task")]
        public async Task<ActionResult<TaskModel>> AddTask([FromBody] TaskModel objTask)
        {
            objTask.IsDeleted = false;
            var res = _context.Tasks.Add(objTask);
            await _context.SaveChangesAsync();
            return res.Entity;
        }

        [Authorize]
        [HttpPost]
        [Route("delete-tasks")]
        public async Task<ActionResult<TaskModel>> DeleteTask([FromBody] List<TaskModel> objTask)
        {
            //objTask.IsDeleted = false;
            foreach (var task in objTask)
            {
               _context.Tasks.Update(task);
            }
            //var res = _context.Tasks.UpdateRange(objTask);
            await _context.SaveChangesAsync();
            return null;
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> Login([FromBody] RegisterModel objTask)
        {
            var user = await _context.Users.Where(x => x.Email == objTask.Email).FirstOrDefaultAsync();
            if (user != null && user.Password == objTask.Password)
            {
                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtTokenConfig.Secret));
                var token = new JwtSecurityToken(
                    issuer: _jwtTokenConfig.Issuer,
                    audience: _jwtTokenConfig.Audience,
                    expires: DateTime.Now.AddHours(3),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );
                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token)
                });
            }
            else
            {
                return NoContent();
            }
        }

        [HttpPost]
        [Route("register")]
        public async Task<ActionResult> Register([FromBody] RegisterModel objTask)
        {
            var currUser = await _context.Users.Where(x => x.Email == objTask.Email).FirstOrDefaultAsync();
            if(currUser != null)
            {
                return NoContent();
            }
            objTask.CreatedAt = DateTime.Now;
            _context.Users.Add(objTask);
            await _context.SaveChangesAsync();

            var user = _context.Users.Where(x => x.Email == objTask.Email).FirstOrDefault();
            if (user != null && user.Password == objTask.Password)
            {
                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtTokenConfig.Secret));
                var token = new JwtSecurityToken(
                    issuer: _jwtTokenConfig.Issuer,
                    audience: _jwtTokenConfig.Audience,
                    expires: DateTime.Now.AddHours(3),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );
                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    id = user.ID,
                    email = user.Email,
                    createdAt = user.CreatedAt,
                    updatedAt = user.UpdatedAt
                });
            }
            return Unauthorized();
        }
    }
}
