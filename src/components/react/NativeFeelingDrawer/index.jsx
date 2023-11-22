import { Drawer } from 'vaul';

function NativeFeelingDrawer({ children }) {
  return (
    <Drawer.Root shouldScaleBackground={true}>
      <Drawer.Trigger asChild>
        <button title="Open Settings" x-ref="settingsDrawerBtn">
          <svg className="text-muted flex-shrink-0" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
              <circle cx="12" cy="12" r="3"/>
            </g>
          </svg>
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="flex bg-white dark:bg-gray-800 flex-col rounded-t-[10px] h-fit mt-24 fixed bottom-0 left-0 right-0">
            <div className="p-4 pb-6 rounded-t-[10px] flex-1">
              <div id="drawer-handle" className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full dark:bg-gray-600 mb-8" />
              <div className="max-w-md mx-auto flex flex-col gap-4">
                <Drawer.Title className="font-medium text-2xl text-primary">
                  Settings
                </Drawer.Title>
                {children}
              </div>
            </div>
          </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export default NativeFeelingDrawer