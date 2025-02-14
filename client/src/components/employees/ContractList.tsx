import React, { useState, useEffect } from 'react'

interface Contract {
  id: number;
  contractId: string;
  type: string;
  startDate: string;
  endDate: string;
  status: string;
  notes: string;
}
    import { useParams } from 'react-router-dom'
    import axios from 'axios'
    import Spinner from '../Spinner'

    const ContractList = () => {
      const [contracts, setContracts] = useState<Contract[]>([])
      const [isLoading, setIsLoading] = useState(true)
      const { employeeId } = useParams()

      useEffect(() => {
        axios.get<Contract[]>(`http://localhost:5000/api/employees/${employeeId}/contracts`)
          .then(response => {
            setContracts(response.data)
            setIsLoading(false)
          })
          .catch(error => {
            console.error('Error fetching contracts:', error)
            setIsLoading(false)
          })
      }, [employeeId])

      if (isLoading) {
        return <Spinner />
      }

      return (
        <div className="contract-list">
          <h1>Contracts</h1>
          <div className="contracts">
            {contracts.map(contract => (
              <div key={contract.id} className="contract">
                <p><strong>Contract ID:</strong> {contract.contractId}</p>
                <p><strong>Type:</strong> {contract.type}</p>
                <p><strong>Start Date:</strong> {new Date(contract.startDate).toLocaleDateString()}</p>
                <p><strong>End Date:</strong> {new Date(contract.endDate).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {contract.status}</p>
                <p><strong>Notes:</strong> {contract.notes}</p>
              </div>
            ))}
          </div>
        </div>
      )
    }

    export default ContractList
