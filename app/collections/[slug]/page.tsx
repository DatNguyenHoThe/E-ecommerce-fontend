export default async function ProductDetails({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    const { slug } = await params
    return <div>Collections: {slug}</div>
  }