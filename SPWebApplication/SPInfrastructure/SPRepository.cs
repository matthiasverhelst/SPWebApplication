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

        public bool StoreFinalEstimate(EstimateDTO estimate)
        {
            var estimateDao = new DAOEstimate(_db);
            return estimateDao.StoreFinalEstimate(estimate);
        }

        public bool CreateParticipant(ParticipantDTO participant)
        {
            var participantDao = new DAOParticipant(_db);
            return participantDao.CreateParticipant(participant);
        }

        public IList<ParticipantDTO> GetParticipantsByRoom(string roomId)
        {
            var participantDao = new DAOParticipant(_db);
            return participantDao.GetParticipantsByRoom(roomId);
        }

        public ParticipantDTO GetParticipantById(int id)
        {
            var participantDao = new DAOParticipant(_db);
            return participantDao.GetParticipantById(id);
        }

        public bool CreateRoom(RoomDTO room)
        {
            var roomDao = new DAORoom(_db);
            return roomDao.CreateRoom(room);
        }

        public bool CreateUser(UserDTO user)
        {
            var userDao = new DAOUser(_db);
            return userDao.CreateUser(user);
        }
    }
}
