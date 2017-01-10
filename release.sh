rm -r ./release
rm ./wallpaper_engine_plitri.c2addon
mkdir release;
mkdir release/files;
mkdir release/files/wallpaper_engine_plitri;
cp ./common.js ./release/files/wallpaper_engine_plitri/;
cp ./edittime.js ./release/files/wallpaper_engine_plitri/;
cp ./runtime.js ./release/files/wallpaper_engine_plitri/;
cp ./PluginIcon.ico ./release/files/wallpaper_engine_plitri/;
cp ./info.xml ./release/info.xml;
cd ./release
zip -r ./wallpaper_engine_plitri.c2addon ./*;
cd ..
mv ./release/wallpaper_engine_plitri.c2addon ./
rm -r ./release;