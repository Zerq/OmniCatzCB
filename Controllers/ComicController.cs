
using System.IO.Compression;
using Microsoft.AspNetCore.Mvc;

public class ComicController : Controller
{
    [HttpGet("/")]
    public FileResult index()
    {
        return File("index.html", "text/html");
    }


    [HttpGet("/comic/{path}")]
    public IEnumerable<string> ListAll(string path)
    {
        path = Uri.UnescapeDataString(path);
        using (var file = System.IO.File.OpenRead(path))
        {
            using (var zip = new ZipArchive(file))
            {
                return zip.Entries.Where(n => this.getMime(n.Name) != null).Select(n => n.Name).OrderBy(n=> n);
            }
        }


        throw new FileLoadException("could not load " + path);
    }

    private string? getMime(string file)
    {
        if (file.EndsWith(".jpg"))
        {
            return "image/jpeg";
        }
        if (file.EndsWith(".jpeg"))
        {
            return "image/jpeg";
        }
        if (file.EndsWith(".gif"))
        {
            return "image/gif";
        }
        if (file.EndsWith(".png"))
        {
            return "image/png";
        }
        if (file.EndsWith(".svg"))
        {
            return "image/svg+xml";
        }
        if (file.EndsWith(".bmp"))
        {
            return "image/bmp";
        }
        if (file.EndsWith(".webp"))
        {
            return "image/webp";
        }
        if (file.EndsWith(".apng"))
        {
            return "image/apng";
        }
        if (file.EndsWith(".avif"))
        {
            return "image/avif";
        }
        if (file.EndsWith(".tif"))
        {
            return "image/tiff";
        }
        if (file.EndsWith(".tiff"))
        {
            return "image/tiff";
        }
        if (file.EndsWith(".ico"))
        {
            return "image/vnd.microsoft.icon";
        }

        return null;
    }


    [HttpGet("/comic/{path}/{imageName}")]
    public FileContentResult Img(string path, string imageName)
    {
        path = Uri.UnescapeDataString(path);

        byte[] outResult;
        using (var store = ZipStorer.Open(path, FileAccess.Read))
        {
            var dir = store.ReadCentralDir();
            var file = dir.Find(n => n.FilenameInZip == imageName);
            store.ExtractFile(file, out outResult);
        }

        var mime = this.getMime(imageName);

        if (mime == null){
            throw new FileLoadException("mimetype not found for " + imageName);
        }

        return new FileContentResult(outResult, mime);
    }

    [HttpGet("/filebrowse_home")]
    public SimpleDirectory ListDir()
    {
        return ListDir(Environment.GetFolderPath(Environment.SpecialFolder.UserProfile));
    }

    [HttpGet("/filebrowse/{path}")]
    public SimpleDirectory ListDir(string path)
    {
        path = Uri.UnescapeDataString(path);


        if (!Path.Exists(path))
        {
            throw new ApplicationException($@"invalid path could not load! ""{path}""");
        }

        return this.makeDir(new DirectoryInfo(path));
    }

    private SimpleDirectory makeDir(DirectoryInfo dir)
    {
        var x = dir.GetDirectories();

        var resultDir = new SimpleDirectory()
        {
            FullName = dir.FullName,
            Parent = dir.Parent?.FullName ?? null,
            Files = dir.GetFiles().Where(n => (n.Extension) == ".cbz").Select(n => new SimpleFile() { Name = n.Name, FullName = n.FullName, Extension = n.Extension }).ToList(),
            Directories = dir.GetDirectories().Select(n => new SimpleDirectory() { Name = n.Name, FullName = n.FullName }).ToList()
        };

        return resultDir;
    }
}

public class SimpleFile
{
    public string? Name { get; set; }
    public string? FullName { get; set; }
    public string? Extension { get; set; }
}

public class SimpleDirectory
{
    public string? Name { get; set; }
    public string? FullName { get; set; }
    public string? Parent { get; set; }
    public List<SimpleFile> Files { get; set; } = new List<SimpleFile>();
    public List<SimpleDirectory> Directories { get; set; } = new List<SimpleDirectory>();
}