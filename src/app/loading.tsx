import Loader from "@/components/Loader/Loader";

function loading() {
  return (
    <section className="flex items-center justify-center h-full bg-neutral-50">
      <Loader />
    </section>
  );
}

export default loading;
