using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace SPCore.DTO
{
    [Table("Room")]
    public class RoomDTO
    {
        [Key]
        [Required]
        public int RoomId { get; set; }

        [Required]
        public UserDTO ScrumMaster { get; set; }
        
        public virtual ICollection<UserDTO> Participants { get; set; }

        public virtual ICollection<ProductBacklogItemDTO> PBIs { get; set; }

    }
}