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
    [ServiceContract]
    public interface ITestService
    {
        // To use HTTP GET, add [WebGet] attribute. (Default ResponseFormat is WebMessageFormat.Json)
        // To create an operation that returns XML,
        //     add [WebGet(ResponseFormat=WebMessageFormat.Xml)],
        //     and include the following line in the operation body:
        //         WebOperationContext.Current.OutgoingResponse.ContentType = "text/xml";
        [OperationContract]
        [WebInvoke(Method="GET", ResponseFormat=WebMessageFormat.Json, BodyStyle=WebMessageBodyStyle.Wrapped, UriTemplate="GetData")]
        String DoWork();

        // Add more operations here and mark them with [OperationContract]
    }
}
