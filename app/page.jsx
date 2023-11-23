import Feed from "@components/Feed"

export default function Home(){
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">Learn & Share
        <br className="max-md:hidden"/>
        <span className="orange_gradient text-center"> AI Powered Prompts</span>
      </h1>
      <p className="desc text-center">getPrompts is a self-made open-source AI prompting tool for people to discover, share and create exquisite prompts.</p>


      <Feed />
    </section>
  )
}