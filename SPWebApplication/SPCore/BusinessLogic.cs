using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SPCore.Interfaces;
using SPCore.DTO;

namespace SPCore
{
    public class BusinessLogic
    {        
        private static ICollection<RoomDTO> rooms = new List<RoomDTO>();

        public static int CreateRoom(String scrumMasterName)
        {
            UserDTO scrumMaster = new UserDTO()
            {
                Name = scrumMasterName
            };

            RoomDTO room = new RoomDTO()
            {
                ScrumMaster = scrumMaster,
                RoomId = new Random().Next(1000, 9999)
            };

            /* Do we need to add the scrumMaster to the users list? */
            ICollection<UserDTO> participants = new List<UserDTO>();
            participants.Add(scrumMaster);

            room.Participants = participants;

            rooms.Add(room);

            return room.RoomId;
        }

        public static Boolean JoinRoom(string name, int id)
        {
            UserDTO user = new UserDTO()
            {
                Name = name
            };

            foreach (var room in rooms)
            {
                if (room.RoomId == id)
                {
                    room.Participants.Add(user);
                    return true;
                }
            }
            return false;
        }
    }
}
