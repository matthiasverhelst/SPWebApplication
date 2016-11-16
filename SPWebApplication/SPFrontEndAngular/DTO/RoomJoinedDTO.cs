using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ScrumPokerService.DTO
{
    public class RoomJoinedDTO
    {
        public bool Success { get; set; }
        public int RoomId { get; set; }
        public String UserName { get; set; }
        public bool IsScrumMaster { get; set; }
    }
}