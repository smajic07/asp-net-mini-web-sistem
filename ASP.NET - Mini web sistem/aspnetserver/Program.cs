using aspnetserver.Data;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy",
        builder =>
        {
            builder
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins("http://localhost:3000");
        });
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(SwaggerGenOptions =>
{
    SwaggerGenOptions.SwaggerDoc("v1", new OpenApiInfo { Title = "Mini Dimački Web Sistem", Version = "v1" });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(SwaggerUIOptions =>
{
    SwaggerUIOptions.DocumentTitle = "Mini Dinamički Web Sistem";
    SwaggerUIOptions.SwaggerEndpoint("/swagger/v1/swagger.json", "Web API za jednostavni CRUD projekat");
    SwaggerUIOptions.RoutePrefix = string.Empty;
});

app.UseHttpsRedirection();

app.UseCors("CORSPolicy");

app.MapGet("/objave", async () => await ObjaveRepository.DobaviObjaveAsync())
    .WithTags("Objave Endpoint");

app.MapGet("/objava/{objavaId}", async (int objavaId) =>
{
    Objava objavaZaVratiti = await ObjaveRepository.DobaviObjavuPoIduAsync(objavaId);

    if (objavaZaVratiti is not null)
    {
        return Results.Ok(objavaZaVratiti);
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Objave Endpoint");

app.MapPost("/kreiraj", async (Objava objavaZaKreirati) =>
{
    bool kreiranjeUspjesno = await ObjaveRepository.KreirajObjavuAsync(objavaZaKreirati);

    if (kreiranjeUspjesno)
    {
        return Results.Ok("Objava uspješno kreirana.");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Objave Endpoint");

app.MapPut("/azuriraj", async (Objava objavaZaAzurirati) =>
{
    bool azuriranjeUspjesno = await ObjaveRepository.AzurirajObjavuAsync(objavaZaAzurirati);

    if (azuriranjeUspjesno)
    {
        return Results.Ok("Objava uspješno ažurirana.");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Objave Endpoint");

app.MapDelete("/obrisi/{objavaId}", async (int objavaId) =>
{
    bool brisanjeUspjesno = await ObjaveRepository.ObrisiObjavuAsync(objavaId);

    if (brisanjeUspjesno)
    {
        return Results.Ok("Objava uspješno obrisana.");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Objave Endpoint");

app.Run();