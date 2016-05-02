using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using SPInfrastructure.Context;
using SPCore.DTO;

namespace SPInfrastructure.DAO
{
    public class DAOUser
    {
        private MainDbContext _db;
        
        public DAOUser(MainDbContext db)
        {
            _db = db;
        }

        public bool CreateUser(User user)
        {
            _db.Users.Add(user);
            int result = _db.SaveChanges();
            return (result > 0);
        }

        public User GetUserById(int id)
        {
            IQueryable<User> query = from user in _db.Users where user.UserId.Equals(id) select user;
            return query.First();
        }
    }
}