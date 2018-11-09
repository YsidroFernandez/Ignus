// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false
};
export const AppConfig = {
  production: false,
  environment: 'LOCAL'
};


export var solicitud = [
  {correo: "peleal@gmail.com", tipo: "Alquiler", descripcion: "Casa grande con todos los servicios", estado: "En Espera",fecha: "11/10/2018", fotos: []},
  {correo: "jelias@gmail.com", tipo: "Compra", descripcion: "Deseo una casa grande", estado: "En Proceso",fecha: "16/11/2018", fotos: []},
  {correo: "jfalcon@gmail.com", tipo: "Venta", descripcion: "Apartamento acogedor con 3 cuartos", estado: "En espera",fecha: "24/09/2018", fotos: []},
  {correo: "Yfernandez@gmail.com", tipo: "Arrendamiento", descripcion: "Quinta con 5 cuartos y un baño", estado: "En espera",fecha: "24/09/2018 20:00", fotos: []},
  {correo: "wquerales@gmail.com", tipo: "Compra", descripcion: "Apartemento en el centro de la ciudad", estado: "En Revision",fecha: "24/09/2018 20:00", fotos: []},
  {correo: "eperez@gmail.com", tipo: "Compra", descripcion: "casa 2 plantas con garage", estado: "En Revision",fecha: "24/09/2018 20:00", fotos: []}
  ]


  import {  startOfDay,  endOfDay,  subDays,  addDays,  endOfMonth,  isSameDay,  isSameMonth,  addHours} from 'date-fns';
  export const colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  };

  import {  CalendarEvent,  CalendarEventAction,  CalendarEventTimesChangedEvent,  CalendarView} from 'angular-calendar';
  export var actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];
  export var calendariocita = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'visita de inmuebles para decision',
      color: colors.red,
      actions: actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true,
      email:'crespo@gmail.com',
      agent: 'wquerales@gmail.com'
    },
    {
      start: startOfDay(new Date()),
      title: 'visita de inmuebles disponibles para verificacion',
      color: colors.yellow,
      actions: actions,
      agent: 'jbonilla@gmail.com'
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'finiquitacion de contrato',
      color: colors.blue,
      allDay: true,
      agent:'jfalcon@gmail.com',
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'cita con el cliente',
      color: colors.yellow,
      actions: actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true,
      email:'mario@gmail.com',
      agent:'jfalcon@gmail.com',
    }
  ];

export var actividadescliente = [
  {
    start: subDays(startOfDay(new Date()), 1),
    end: addDays(new Date(), 1),
    title: 'Cita en 3 dias.',
    color: colors.red,
    actions: actions,
    allDay: true,
    resizable: {
      beforeStart: true,
      afterEnd: true
    },
    draggable: true
  },
  {
    start: startOfDay(new Date()),
    title: 'Visita al inmmuble.',
    color: colors.yellow,
    actions: actions
  },
  {
    start: subDays(endOfMonth(new Date()), 3),
    end: addDays(endOfMonth(new Date()), 3),
    title: 'Cita para la reserva del inmmueble',
    color: colors.blue,
    allDay: true
  },
  {
    start: addHours(startOfDay(new Date()), 2),
    end: new Date(),
    title: 'Cita para leer terminos y garantias del contrato',
    color: colors.yellow,
    actions: actions,
    resizable: {
      beforeStart: true,
      afterEnd: true
    },
    draggable: true
  }
];

