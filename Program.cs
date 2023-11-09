
using Microsoft.EntityFrameworkCore;
/* using Microsoft.EntityFrameworkCore namespace allow access classes and functionalities within Entity Framework Core */
using my_new_app;
/* Namespace of my application */
using my_new_app.SeedData;
/* access the namespace SeedData which is located inside of the Application */

var builder = WebApplication.CreateBuilder(args);
/* WebApplication is a class provided by ASP.Net Core 6 ,Its the entry point point to create and configure applications HTTP request */
/* CreateBuilder(arg) is a static method called on webApplication class that is use to create a new instance of a WebApplication.
 * arg is the parameter that is an arry of command-line agrument passsed to the webapllication when it starts */ 

builder.Services.AddControllersWithViews();
/* builder.Services.AddControllersWithViews();  is used to configure and add support for controller and views in an ASP.NET Core web application 
   builder is an instance of the webApplication  or the return WebApplicationBuilder object 
   Services is a property of the WebApplicationBuilder object that allows you to access the DI container.  
   AddControllersWithViews is used to register and configure services needed for working with controllers and views in an ASP.NET Core application ,its required for HTTP request ,routing and rendering views  */
string connectionString = builder.Configuration.GetConnectionString("Default");
/* retrieves a connection string named "Default" from the configuration settings of the application and assigns it to the connectionString variable .*/
/* This is a property or method that allows you to access the configuration system.  such as appsettings.json files, environment variables, command-line arguments, and more.*/
builder.Services.AddDbContext<DbContexts>(options => options.UseSqlServer(connectionString));
/* is used to configure and register a database context (DbContexts) with the Dependency Injection (DI) container in an ASP.NET Core application.
   AddDbContext<DbContexts> this method is used to register a database context type DbContext in the DI container 
    A database context is a key component of Entity Framework, and it represents the session with the database, allowing you to query and interact with your database.
    (options => options.UseSqlServer(connectionString))  
This part configures the database context. It specifies that the database context should use SQL Server as the database provider and provides the connection string (connectionString) needed to connect to the database.*/

builder.Services.AddCors();
/* builder.Services.AddCors() statement is used to configure and enable Cross-Origin Resource Sharing (CORS) in an ASP.NET Core application. 
   CORS (Cross-Origin Resource Sharing) is a security feature implemented in web browsers to control which web pages are allowed to make requests to a different domain or origin.*/
var app = builder.Build();
/* Compiles the setting set up for the app turning them into a runnable application */
app.UseCors(builder =>
    builder.WithOrigins("https://localhost:44436")
           .AllowAnyMethod()
           .AllowAnyHeader());
// Configure the HTTP request pipeline.
/* This method allows you to define and enforce CORS policies, specifying which origins (websites) are allowed to access your API, which HTTP methods are permitted, and which HTTP headers are accepted.  */
/*  builder => { ... }: This is a lambda expression that defines the CORS policy. It's passed to the app.UseCors method and contains the configuration for CORS.*/
if (!app.Environment.IsDevelopment())
/* app.Environment.IsDevelopment(): This code checks the environment of the application 
     */

{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
    /*Enabling HSTS in a production environment is a security best practice to ensure that communication with your application occurs over a secure and encrypted connection.
      Only accept HTTPS*/

}
/* app.UseHttpsRedirection();  No need to redirect HTTP to HTTPS when app.UseHsts() only accelpting HTTPS */
/* app.UseHttpsRedirection(); is a middleware in an ASP.NET Core application that helps enforce secure communication by redirecting HTTP requests to their HTTPS counterparts 
   when When a user's browser sends an HTTP request to your application this middleware intercepts that request It then responds with a "302 Found" status code and a redirect response to the same URL but with HTTPS */
app.UseStaticFiles();
/*  When users visit your website, their web browsers can download these static files (like images and stylesheets) directly, which reduces the server's workload and speeds up the user's experience */
app.UseRouting();
/* app.UseRouting(); is a middleware in ASP.NET Core that helps in routing HTTP requests to the appropriate endpoints or controllers in your application.*/
app.MapControllerRoute(
    /* is a method in ASP.NET Core that configures routing for controller actions in your application*/
name: "default",
/* This is a unique name for the route. It's used to identify the route when generating URLs.*/
pattern: "{controller}/{action=Index}/{id?}");
/* This parameter specifies the URL pattern that the route should match. It typically includes placeholders for controller, action, and optional parameters */

/*app.MapFallbackToFile("/");*/
using (var scope = app.Services.CreateScope())
/* is used for creating a scope within the Dependency Injection (DI) container of your ASP.NET Core application*/
{
    var serviceProvider = scope.ServiceProvider;
    /* ServiceProvider It's a central component responsible for creating and managing instances of services in an application. */
    var context = serviceProvider.GetRequiredService<DbContexts>();

    // Seed the data
    DbInitializer.SeedData(context);
}
app.Run();
