# ElectArch
Simple arch linux emulator using electron and v86

Beta:tm:

Basically this is my attempt making a better(i think) design of v86 website

## Feature
 - Autosave(It works this time)
 - Nice dark terminal design
 - File exchanging
 - Arch linux with latest tools
 - Network access(WIP)
 - Starts very fast
 - Lightweight(This time not single file anymore, Can be reused easily)

## How to

#### Hardware requirement
Recommended :
- i5 8th gen
- 4GB of ram
- (optional) Process lasso or ram managing software

#### Resources usage
- Around 20% - 50% CPU on busy, 0% on idle
- 1 GB of ram
- 30MB of storage

#### Installing
1. Download as zip(Installer soon:tm:)
2. Put it somewhere that you usually put programs
3. Run `npm install`
4. Create a new shortcut, configure it like below :
  - Target: `<mainFolder>\node_modules\electron\dist\electron.exe "<mainFolder>"`
  - Start in: `<mainFolder>`
 - To run without shortcut, Run `npm start`
5. Open it.

#### Network support
 - Network suport is WIP, not enabled by default because i cannot compile the dependency
 - To install the network relay, Run `npm install tuntap2`
 - To enable networking in the VM, Run `./networking.sh` in the VM
#### File exchanging
1. Hover your mouse at the bottom right corner, A panel should fade in.
2. For getting files out from vm, enter the full path to the file.
3. State reset button is also accessible from there

### Credit
[Copy](https://github.com/copy) for [v86](https://github.com/copy/v86)
