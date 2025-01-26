
using System.IO.Compression;
using System.Reflection;
using System.Reflection.Metadata;
using System.Text.Encodings.Web;
using AspNetExtensions;
using CsTools.Extensions;
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
                return zip.Entries.Select(n => n.Name);
            }
        }


        throw new FileLoadException("could not load " + path);
    }

    private string? getMime(string file)
    {
        if (file.EndsWith(".jpg"))
        {
            return "image/jpg";
        }
        if (file.EndsWith(".jpeg"))
        {
            return "image/jpg";
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
    public FileResult Img(string path, string imageName)
    {
        byte[]? bytes = null;
        using (var file = System.IO.File.OpenRead(path))
        {
            if (file != null)
            {
                using (var zip = new ZipArchive(file))
                {
                    using (var imageFile = zip.GetEntry(imageName)?.Open())
                    {

                        if (imageFile == null)
                        {
                            throw new FileLoadException("could not load " + imageName);
                        }

                        using (BinaryReader reader = new BinaryReader(imageFile))
                        {
                            bytes = reader.ReadBytes((int)imageFile.Length);
                        }

                    }
                }
            }
        }

        if (bytes == null || bytes?.Length == 0)
        {
            throw new FileLoadException("could not load " + imageName);
        }

        var mime = this.getMime(imageName);

        if (mime == null){
            throw new ApplicationException(imageName + " Cannot be loaded as image");
        }

        return new FileContentResult(bytes!, mime);
    }

    [HttpGet("/filebrowse_home")]
    public SimpleDirectory ListDir() {
       return ListDir(Environment.GetFolderPath(Environment.SpecialFolder.UserProfile));
    }

    [HttpGet("/filebrowse/{path}")]
    public SimpleDirectory ListDir(string path) {
        path = Uri.UnescapeDataString(path);


        if (!Path.Exists(path)){
            throw new ApplicationException($@"invalid path could not load! ""{path}""");
        }
        
        return this.makeDir(new DirectoryInfo(path));
    }

    private SimpleDirectory makeDir(DirectoryInfo dir) {
        var x = dir.GetDirectories();

        var resultDir = new SimpleDirectory(){
            FullName = dir.FullName,        
            Parent = dir.Parent?.FullName ?? null,
            Files = dir.GetFiles().Where(n=>(n.Extension) == ".cbz").Select(n=> new SimpleFile(){  Name = n.Name, FullName= n.FullName, Extension = n.Extension}).ToList(),
            Directories = dir.GetDirectories().Select(n=> new SimpleDirectory(){ Name = n.Name, FullName= n.FullName}).ToList()
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