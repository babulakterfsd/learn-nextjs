import { useRouter } from 'next/navigation';

const ServicesButton = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      className="bg-indigo-300 text-indigo-600 text-center rounded-sm mt-4 px-2"
      onClick={() => router.push('/movies')}
    >
      visit movie portal
    </button>
  );
};

export default ServicesButton;
