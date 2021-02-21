import * as React from 'react'
import styles from './styles.module.css'

interface Props {
  text: string
}
// just test onlyssss
// made some change
export const ExampleComponent = ({ text }: Props) => {
  return <div className={styles.test}>Example Component: {text}</div>
}
