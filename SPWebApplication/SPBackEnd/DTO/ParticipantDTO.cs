using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace SPBackEnd.DTO
{
    [Table("Participant")]
    public class ParticipantDTO
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ParticipantId { get; set; }
        
        public int RoomId { get; set; }
        
        public int UserId { get; set; }
        
        [Required]
        public string ParticipantHash { get; set; }
        
        [Required]
        public int Role { get; set; }
        
        [ForeignKey("RoomId")]
        public virtual RoomDTO Room { get; set; }
        
        [ForeignKey("UserId")]
        public virtual UserDTO User { get; set; }
    }
}