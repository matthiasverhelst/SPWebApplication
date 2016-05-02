using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace SPCore.Model
{
    [Table("Room")]
    public class Room
    {
        [Key]
        [Required]
        public int RoomId { get; set; }

        [Required]
        public User ScrumMaster { get; set; }
        
        public virtual ICollection<User> Participants { get; set; }

        public virtual ICollection<ProductBacklogItem> PBIs { get; set; }

    }
}