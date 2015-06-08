using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using SPBackEnd.Context;
using SPBackEnd.DTO;

namespace SPBackEnd.DAO
{
    public class DAOParticipant : DAOBase<MainDbContext>
    {

        public bool CreateParticipant(ParticipantDTO particpant)
        {
            db.Participants.Add(particpant);
            int result = db.SaveChanges();
            return (result > 0);
        }

        public IList<ParticipantDTO> GetParticipantsByRoom(string roomId)
        {
            IQueryable<ParticipantDTO> query = from participant in db.Participants where participant.RoomId.Equals(roomId) select participant;
            return query.ToList();
        }

        public ParticipantDTO GetParticipantById(int id)
        {
            IQueryable<ParticipantDTO> query = from participant in db.Participants where participant.ParticipantId.Equals(id) select participant;
            return query.First();
        }
        
    }
       
}