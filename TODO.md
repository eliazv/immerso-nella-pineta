- opzione per segnare riscossione tassa di soggiorno di una prenotaizone
- aggiungi e rimuovi alloggi , unico nome ora hanno ancora valori mockati app 3, n 3 o primario
- se volessi rendere questa piattaforma aperta a tutti con accesso a google, aggiunta riumozione appartmaenti , completa configuarazione cosa dovrei fare? turso va ancora bene?
- risolvi:
  chunk-T2SWDQEL.js?v=0151afbd:16670 Uncaught TypeError: formData.adulti.trim is not a function
  at BookingModal.tsx:174:23
  at commitHookEffectListMount (chunk-T2SWDQEL.js?v=0151afbd:16915:34)
  at commitPassiveMountOnFiber (chunk-T2SWDQEL.js?v=0151afbd:18156:19)
  at commitPassiveMountEffects_complete (chunk-T2SWDQEL.js?v=0151afbd:18129:17)
  at commitPassiveMountEffects_begin (chunk-T2SWDQEL.js?v=0151afbd:18119:15)
  at commitPassiveMountEffects (chunk-T2SWDQEL.js?v=0151afbd:18109:11)
  at flushPassiveEffectsImpl (chunk-T2SWDQEL.js?v=0151afbd:19490:11)
  at flushPassiveEffects (chunk-T2SWDQEL.js?v=0151afbd:19447:22)
  at commitRootImpl (chunk-T2SWDQEL.js?v=0151afbd:19416:13)
  at commitRoot (chunk-T2SWDQEL.js?v=0151afbd:19277:13)
  (anonymous) @ BookingModal.tsx:174
  commitHookEffectListMount @ chunk-T2SWDQEL.js?v=0151afbd:16915
  commitPassiveMountOnFiber @ chunk-T2SWDQEL.js?v=0151afbd:18156
  commitPassiveMountEffects_complete @ chunk-T2SWDQEL.js?v=0151afbd:18129
  commitPassiveMountEffects_begin @ chunk-T2SWDQEL.js?v=0151afbd:18119
  commitPassiveMountEffects @ chunk-T2SWDQEL.js?v=0151afbd:18109
  flushPassiveEffectsImpl @ chunk-T2SWDQEL.js?v=0151afbd:19490
  flushPassiveEffects @ chunk-T2SWDQEL.js?v=0151afbd:19447
  commitRootImpl @ chunk-T2SWDQEL.js?v=0151afbd:19416
  commitRoot @ chunk-T2SWDQEL.js?v=0151afbd:19277
  performSyncWorkOnRoot @ chunk-T2SWDQEL.js?v=0151afbd:18895
  flushSyncCallbacks @ chunk-T2SWDQEL.js?v=0151afbd:9119
  (anonymous) @ chunk-T2SWDQEL.js?v=0151afbd:18627Understand this error
  chunk-T2SWDQEL.js?v=0151afbd:14032 The above error occurred in the <BookingModal> component:

      at BookingModal (http://localhost:8080/src/components/calendar/BookingModal.tsx?t=1754307916829:89:32)
      at div
      at AvailabilityCalendar (http://localhost:8080/src/components/AvailabilityCalendar.tsx?t=1754308133092:24:33)
      at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=f1d6cf69:4069:5)
      at Outlet (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=f1d6cf69:4444:26)
      at div
      at div
      at BackofficeLayout (http://localhost:8080/src/components/backoffice/BackofficeLayout.tsx:23:33)
      at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=f1d6cf69:4069:5)
      at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=f1d6cf69:4508:5)
      at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=f1d6cf69:4451:15)
      at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=f1d6cf69:5196:5)
      at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-NPI43BMZ.js?v=0151afbd:38:15)
      at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=cb46c75a:58:5)
      at _a (http://localhost:8080/node_modules/.vite/deps/react-helmet-async.js?v=c1bba66a:550:5)
      at QueryClientProvider (http://localhost:8080/node_modules/.vite/deps/@tanstack_react-query.js?v=42a7482e:2794:3)
      at App

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.
logCapturedError @ chunk-T2SWDQEL.js?v=0151afbd:14032
update.callback @ chunk-T2SWDQEL.js?v=0151afbd:14052
callCallback @ chunk-T2SWDQEL.js?v=0151afbd:11248
commitUpdateQueue @ chunk-T2SWDQEL.js?v=0151afbd:11265
commitLayoutEffectOnFiber @ chunk-T2SWDQEL.js?v=0151afbd:17093
commitLayoutMountEffects_complete @ chunk-T2SWDQEL.js?v=0151afbd:17980
commitLayoutEffects_begin @ chunk-T2SWDQEL.js?v=0151afbd:17969
commitLayoutEffects @ chunk-T2SWDQEL.js?v=0151afbd:17920
commitRootImpl @ chunk-T2SWDQEL.js?v=0151afbd:19353
commitRoot @ chunk-T2SWDQEL.js?v=0151afbd:19277
performSyncWorkOnRoot @ chunk-T2SWDQEL.js?v=0151afbd:18895
flushSyncCallbacks @ chunk-T2SWDQEL.js?v=0151afbd:9119
(anonymous) @ chunk-T2SWDQEL.js?v=0151afbd:18627Understand this error
chunk-T2SWDQEL.js?v=0151afbd:9129 Uncaught TypeError: formData.adulti.trim is not a function
at BookingModal.tsx:174:23
at commitHookEffectListMount (chunk-T2SWDQEL.js?v=0151afbd:16915:34)
at commitPassiveMountOnFiber (chunk-T2SWDQEL.js?v=0151afbd:18156:19)
at commitPassiveMountEffects_complete (chunk-T2SWDQEL.js?v=0151afbd:18129:17)
at commitPassiveMountEffects_begin (chunk-T2SWDQEL.js?v=0151afbd:18119:15)
at commitPassiveMountEffects (chunk-T2SWDQEL.js?v=0151afbd:18109:11)
at flushPassiveEffectsImpl (chunk-T2SWDQEL.js?v=0151afbd:19490:11)
at flushPassiveEffects (chunk-T2SWDQEL.js?v=0151afbd:19447:22)
at commitRootImpl (chunk-T2SWDQEL.js?v=0151afbd:19416:13)
at commitRoot (chunk-T2SWDQEL.js?v=0151afbd:19277:13)
(anonymous) @ BookingModal.tsx:174
commitHookEffectListMount @ chunk-T2SWDQEL.js?v=0151afbd:16915
commitPassiveMountOnFiber @ chunk-T2SWDQEL.js?v=0151afbd:18156
commitPassiveMountEffects_complete @ chunk-T2SWDQEL.js?v=0151afbd:18129
commitPassiveMountEffects_begin @ chunk-T2SWDQEL.js?v=0151afbd:18119
commitPassiveMountEffects @ chunk-T2SWDQEL.js?v=0151afbd:18109
flushPassiveEffectsImpl @ chunk-T2SWDQEL.js?v=0151afbd:19490
flushPassiveEffects @ chunk-T2SWDQEL.js?v=0151afbd:19447
commitRootImpl @ chunk-T2SWDQEL.js?v=0151afbd:19416
commitRoot @ chunk-T2SWDQEL.js?v=0151afbd:19277
performSyncWorkOnRoot @ chunk-T2SWDQEL.js?v=0151afbd:18895
flushSyncCallbacks @ chunk-T2SWDQEL.js?v=0151afbd:9119
(anonymous) @ chunk-T2SWDQEL.js?v=0151afbd:18627Understand this error
