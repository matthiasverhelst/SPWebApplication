using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SPCore.DTO;

namespace SPCore.Interfaces
{
    public interface ISPRepository
    {
        bool StoreFinalEstimate(EstimateDTO estimate);
        bool CreateParticipant(ParticipantDTO participant);
        IList<ParticipantDTO> GetParticipantsByRoom(string roomId);
        ParticipantDTO GetParticipantById(int id);
        bool CreateRoom(RoomDTO room);
        bool CreateUser(UserDTO user);
    }
}
