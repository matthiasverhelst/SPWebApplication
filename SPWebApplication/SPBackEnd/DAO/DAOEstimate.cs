using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using SPBackEnd.Context;
using SPBackEnd.DTO;

namespace SPBackEnd.DAO
{
    public class DAOEstimate : DAOBase<MainDbContext>
    {
        public bool StoreFinalEstimate(EstimateDTO Estimate)
        {
            db.Estimates.Add(Estimate);
            int result = db.SaveChanges();
            return (result > 0);
        }
    }
       
}