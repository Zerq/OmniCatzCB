***************************** Origin Purpose and long term vission *****************************

This project was basically started as part of a frontend course i am taking.
we got to pick something to make to test out doing something with webstorage and and working with an api even one we make ourselves.
I picked implementing a comic book reader since its its a fairly simple format and i have some long term inereest in developing this app.


Long term i wanna build a animation editor thingy for doing panning logic and also queing up audio playback and/or scanning over the comic with OCR (optical character recognition) and using TTS (text to speech) to generate speech.

Basically long term i wanna build tooling for turning a comic book into something you can listen too.
partially for accessability reasons but also because i hate media i cant listen to while i am working on something else... 
SO this great flaw in comic books must be rectified!!


************************************** Build Instructions **************************************
 
 initial version:
    verified on: linux mint 22.1, window 10
    dependencies: dotnet9.0
    optionalDependencies: npm, nodejs, jsdoc, typescript(used for t.ds)
    
    build steps:

    git clone the repository down locally or grab a zip archive and extract
    
    run npm install (optional... this is only for typeing to improve the intellicense and linting etc...) 

    run "dotnet run" in  the terminal in the app folder and accept the local SSL certificate alternativly just press run in vscode or visual studio after opening the project.



 future version:
   dependencies: Python3, edge-tts(python library), mpv(linux)

   (setup for requirment for this is likely to be a bit more complicated this should be a wonderful opportunity into getting into packaging flatpak applications :)