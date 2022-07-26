using Microsoft.EntityFrameworkCore;

namespace aspnetserver.Data
{
    internal static class ObjaveRepository
    {
        internal async static Task<List<Objava>> DobaviObjaveAsync()
        {
            using (var db = new AppDBContext())
            {
                return await db.Objave.ToListAsync();
            }
        }

        internal async static Task<Objava> DobaviObjavuPoIduAsync(int objavaId)
        {
            using (var db = new AppDBContext())
            {
                return await db.Objave
                    .FirstOrDefaultAsync(objava => objava.ObjavaId == objavaId);
            }
        }

        internal async static Task<bool> KreirajObjavuAsync(Objava objavaZaKreirati)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    await db.Objave.AddAsync(objavaZaKreirati);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }

        internal async static Task<bool> AzurirajObjavuAsync(Objava objavaZaAzurirati)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    db.Objave.Update(objavaZaAzurirati);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }

        internal async static Task<bool> ObrisiObjavuAsync(int objavaId)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    Objava objavaZaObrisati = await DobaviObjavuPoIduAsync(objavaId);

                    db.Remove(objavaZaObrisati);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }
    }
}
