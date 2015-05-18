using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace SPBackEnd.DTO
{
    [Table("Room")]
    public class RoomDTO
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RoomId { get; set; }
        [Required]
        public string RoomHash { get; set; }
        public virtual ICollection<ParticipantDTO> Participants { get; set; }
    }
}