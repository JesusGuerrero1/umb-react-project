export async function retrieveData(path) {
    const response = await fetch(path)
  
    if (response.status !== 200) {
      return {
        status: 'error',
        message: 'Error: Something went wrong'
      }
    }
    
    const result = await response.json();
    
    return result
  }
  
export async function saveData(data) {
    try {
        const response = await fetch("http://localhost:3001/api/costs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        })

        const result = await response.json()

        return {
        status: 'success',
        message: 'Successfully Saved'
        }
    } catch (error) {
        return {
        status: 'error',
        message: `Error: ${error}`
        }
    }
}