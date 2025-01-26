var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
var app = builder.Build();

app.UseStaticFiles();
app.MapDefaultControllerRoute();
app.MapStaticAssets();
app.MapControllers(); 

app.Run();