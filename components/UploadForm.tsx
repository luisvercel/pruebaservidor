export default function UploadForm() {
  const submit = async (e:any) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    const res = await fetch("https://xpkowki7yjvpzxu4lma5q4abw40jgmwj.lambda-url.us-east-1.on.aws/contratos/fisicas/subirdocumento", {
      method: "POST",
      body: formData
    })

    console.log(await res.text())
  }

  return (
    <form onSubmit={submit}>
      <input type="file" name="archivo" accept="image/*" required />
      <button type="submit">Subir</button>
    </form>
  )
}