using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ScrumPokerService.Models
{
    public class EstimateModel
    {
        public string pbi_id { get; set; }
        public string participant_hash { get; set; }
        public int estimate { get; set; }
    }
}