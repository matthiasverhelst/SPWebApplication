using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace SPCore.DTO
{
    [Table("User")]
    public class UserDTO
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }
       
        [Required]
        public string EmailAddress { get; set; }
        
        public virtual ICollection<ParticipantDTO> Participants { get; set; }
    }
}