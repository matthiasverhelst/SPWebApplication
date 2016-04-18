using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.AspNet.SignalR;
using Owin;

[assembly: OwinStartup(typeof(ScrumPokerService.SocketStartup))]

namespace ScrumPokerService
{
    public class SocketStartup
    {
        public static void Configuration(IAppBuilder app)
        {
            // Any connection or hub wire up and configuration should go here
            app.Map("/signalr", map =>
            {
                // Setup the CORS middleware to run before SignalR.
                // By default this will allow all origins. You can 
                // configure the set of origins and/or http verbs by
                // providing a cors options with a different policy.
                map.UseCors(CorsOptions.AllowAll);
                var hubConfiguration = new HubConfiguration
                {
                    // You can enable JSONP by uncommenting line below.
                    // JSONP requests are insecure but some older browsers (and some
                    // versions of IE) require JSONP to work cross domain
                    // EnableJSONP = true
                };
                // Run the SignalR pipeline. We're not using MapSignalR
                // since this branch already runs under the "/signalr"
                // path.
                map.RunSignalR(hubConfiguration);
            });
            GlobalHost.Configuration.ConnectionTimeout = TimeSpan.FromSeconds(6000); // Should be lower in PRD
        }
    }
}
