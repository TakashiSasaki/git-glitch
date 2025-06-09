@echo off
SET BAT_UUID=5a0146b7-8744-49cc-a69d-b38fad10b940
SET BAT_VERSION=0.1.1.20230822
SET EVERYTHING_EXE="C:\Program Files\Everything\Everything.exe"
SET "EFU_FILENAME=%~n0"
SET "EFU_FILENAME=%EFU_FILENAME%.efu"

:menu
ECHO off
echo.
echo 1. Create efu file
echo 2. option 2
echo 3. option 3
echo 4. exit
echo.
set /p choice="choose (1-4): "
if "%choice%"=="1" goto option1
if "%choice%"=="2" goto option2
if "%choice%"=="3" goto option3
if "%choice%"=="4" goto end
goto menu

:option1
echo Creating %EFU_FILENAME%
echo on
%EVERYTHING_EXE% -create-file-list "%EFU_FILENAME%" "."
echo off
goto menu

:option2
echo option 2, nothing to do
goto menu

:option3
echo option 3, nothing to do
goto menu

:end
exit
