using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SPCore.Interfaces;
using SPCore.DTO;
using SPInfrastructure.Context;
using SPInfrastructure.DAO;

namespace SPInfrastructure.Repositories
{
    public class SPRepository : ISPRepository
    {
        private MainDbContext _db = new MainDbContext();

        public bool StoreFinalEstimate(Estimate estimate)
        {
            var estimateDao = new DAOEstimate(_db);
            return estimateDao.StoreFinalEstimate(estimate);
        }

        public bool CreateRoom(Room room)
        {
            var roomDao = new DAORoom(_db);
            return roomDao.CreateRoom(room);
        }

        public bool CreateUser(User user)
        {
            var userDao = new DAOUser(_db);
            return userDao.CreateUser(user);
        }
    }
}
