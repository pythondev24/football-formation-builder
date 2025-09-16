#!/bin/sh
function REM() { return; }
REM @'
REM '; : << "BATCHFILE"
@echo off
python -V >nul 2>&1
if %errorlevel% == 0 (
python server.py
) else (
python3 server.py
)
goto:EOF
BATCHFILE
if command -v python >/dev/null 2>&1 ; then
python server.py
else
python3 server.py
fi
exit
'@
if (Get-Command python -ErrorAction SilentlyContinue) {
python server.py
} else {
python3 server.py
}