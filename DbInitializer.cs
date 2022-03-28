using KwansoTest.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KwansoTest
{
    public static class DbInitializer
    {
        public static void Initialize(AppContext context)
        {
            context.Database.EnsureCreated();

            if (context.Tasks.Any() && context.Users.Any())
            {
                return; 
            }

            context.SaveChanges();
        }
    }
}
