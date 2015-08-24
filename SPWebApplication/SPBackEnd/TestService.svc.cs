using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;

namespace SPBackEnd
{
    
    public class TestService : ITestService
    {
        public String DoWork()
        {
            // Add your operation implementation here
            return "It works!";
        }

        // Add more operations here and mark them with [OperationContract]
    }
}
