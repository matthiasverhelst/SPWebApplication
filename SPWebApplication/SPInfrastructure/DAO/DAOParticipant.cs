using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using SPInfrastructure.Context;
using SPCore.DTO;

namespace SPInfrastructure.DAO
{
    public class DAOParticipant
    {
        private MainDbContext _db;
        
        public DAOParticipant(MainDbContext db)
        {
            _db = db;
        }

        public bool CreateParticipant(ParticipantDTO particpant)
        {
            _db.Participants.Add(particpant);
            int result = _db.SaveChanges();
            return (result > 0);
        }

        public IList<ParticipantDTO> GetParticipantsByRoom(string roomId)
        {
            IQueryable<ParticipantDTO> query = from participant in _db.Participants where participant.RoomId.Equals(roomId) select participant;
            return query.ToList();
        }

        public ParticipantDTO GetParticipantById(int id)
        {
            IQueryable<ParticipantDTO> query = from participant in _db.Participants where participant.ParticipantId.Equals(id) select participant;
            return query.First();
        }
        
    }
       
}