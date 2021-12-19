# InduláSch web application
![Version](https://img.shields.io/github/package-json/v/kir-dev/indulasch-frontend?style=flat-square) ![Issues](https://img.shields.io/github/issues/kir-dev/indulasch-frontend?style=flat-square) 

Progressive web application to display nearby departures and related information for a given location. Powered by the induláSch API and BKK Futár.
## Displayed information
The main profile of the application is displaying nearby public transport departures (works only in Budapest via the official API). There are also other information fields called widgets after the departure list.
There is a widget to display the nearest Bubi bike dock, and a widget to display the current weather.
## Progressive web application
The UI is designed to suit almost every kind of device. Therefore it is enjoyable on smartphones via a browser and as a progressive web application.
![induláSch on a smartphone](https://warp.kir-dev.sch.bme.hu/img/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBTdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--133cebeeb425a7e39b267eddc354d9759b88b455/iPhone.png)
## Kiosk mode
InduláSch at first created for big displays to imitate passenger information systems.
Therefore a display mode is available, called kiosk mode to display information that is not suitable for mobile devices, but handful for bigger displays.
One thing that is unique for induláSch is the support of SchPincér, another brilliant project of Kir-Dev.
Kiosk mode can be accessed by adding a query parameter at the end of the URL.
`http://localhost:3000/?mode=kiosk`
In this mode, the settings icon will be hidden, and the settings panel can be accessed by clicking the logo.
![induláSch kiosk mode](https://warp.kir-dev.sch.bme.hu/img/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBUQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--cf52887cf07293ce99f1da21ff656b80bb44025b/TV.png)
## Widgets
Widgets are information field at the bottom of the application. Currently, there are 3 widgets available.
If a widget fails to get data from its source, it will hide itself. SchPincér widget is only available in kiosk mode, and an API key must be added in the settings panel to work.
