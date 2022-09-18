import { useContext, useState } from 'react';
import { SlButton, SlCheckbox, SlInput, SlAlert, SlIcon } from '@shoelace-style/shoelace/dist/react';

import OBSContext from './lib/obsContext'

import './ConnectForm.css'

export default function Connect({ onConnect }) {
  const obs = useContext(OBSContext)

  const [ url, setUrl ] = useState()
  const [ pass, setPass ] = useState()
  const [ error, setError ] = useState()

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      await obs.connect(url || 'ws://localhost:4455', pass || null)
      console.log('connected?', obs.socket)
      onConnect(obs)
    } catch(ex) {
      setError(ex.message || `Error code ${ex.code}`)
    }
  }

  return (
    <div className="ConnectForm">
      <form onSubmit={handleSubmit}>
        <SlAlert variant="danger" open={error} closable onSlAfterHide={() => setError(null)}>
          <SlIcon slot="icon" name="exclamation-octagon" />
          <strong>Can't connect</strong>
          <br />
          {error}
        </SlAlert>
      
        <SlInput name="url" label="WebSocket URL" placeholder="localhost:4455" onSlInput={e => setUrl(e.target.value)} />
        <br />
        <SlInput name="pass" label="Password" type="password" onSlInput={e => setPass(e.target.value)} />
        <br />
        <SlCheckbox>Auto-connect</SlCheckbox>
        <br />
        <br />
        <SlButton type="submit" variant="primary">
          Submit
        </SlButton>
      </form>
    </div>
  );
};
