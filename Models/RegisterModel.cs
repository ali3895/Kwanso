using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KwansoTest.Models
{
    public class RegisterModel
    {
        public int ID { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
