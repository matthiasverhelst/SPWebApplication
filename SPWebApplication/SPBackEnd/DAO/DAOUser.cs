using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using SPBackEnd.Context;
using SPBackEnd.DTO;

namespace SPBackEnd.DAO
{
    public class DAOUser : DAOBase<MainDbContext>
    {

        public bool CreateUser(UserDTO user)
        {
            db.Users.Add(user);
            int result = db.SaveChanges();
            return (result > 0);
        }


        public UserDTO GetUserById(int id)
        {
            IQueryable<UserDTO> query = from user in db.Users where user.UserId.Equals(id) select user;
            return query.First();
        }

    }
       
}