import { MouseEvent } from 'react'
import { Switch } from '@headlessui/react'

interface CustomSwitch {
  className: string;
  onClick: (e?: MouseEvent<HTMLButtonElement>) => void;
  id: string;
  enabled: boolean;
}

export default function CustomSwitch({ className, onClick, id, enabled }: CustomSwitch) {

  return (
    <Switch
      id={id}
      checked={enabled}
      onClick={(e: MouseEvent<HTMLButtonElement>) => onClick(e)}
      className={`${enabled ? 'bg-daydreamer-blue' : 'bg-daydreamer-orange-inactive'
        } ${className} relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${enabled ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  )
}