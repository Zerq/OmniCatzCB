
   var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
   var builder = WebApplication.CreateBuilder(args);
   builder.Services.AddCors();
   builder.Services.AddControllers();
   var app = builder.Build();
   app.UseHttpsRedirection();
   app.UseCors(MyAllowSpecificOrigins);
   app.UseStaticFiles(
      new StaticFileOptions{  ServeUnknownFileTypes= true}
   );
   app.MapDefaultControllerRoute();
   app.MapStaticAssets();
   app.MapControllers();
   app.Run();


//this bit i am gonna need to tinker with
//this stuff has a lot of dependencies and i may be using the wrong 
//version i have gotten it working before so need to figure that out again
//will probably wanna package the final version with flatpak to manage the depdencies 

//  new WebWindowNetCore.WebView()
//   .InitialBounds(1200, 1800)
//   .Title("Omnicatz Comic book reader")
//   .AppId("OmnicatzCB")
//   .DevTools()
//   .SaveBounds()
//   .CanClose(() =>
//   {
//       return true;
//   })
//   .Url("http://localhost:5117")
//   .Run(); 

// app.WaitForShutdown();

