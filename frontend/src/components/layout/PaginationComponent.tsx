import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  totalItem: number;
  perPage: number;
  showItem: number;
}

const PaginationComponent = ({
  pageNumber,
  setPageNumber,
  totalItem,
  perPage,
  showItem,
}: Props) => {
  const totalPage = Math.ceil(totalItem / perPage);
  let startPage = pageNumber;

  if (totalPage <= showItem) {
    startPage = 1;
  } else {
    startPage = Math.max(1, pageNumber - Math.floor(showItem / 2));
  }

  const endPage = Math.min(startPage + showItem - 1, totalPage);

  const createBtn = () => {
    const btns = [];
    for (let i = startPage; i <= endPage; i++) {
      const isActive = pageNumber === i;
      btns.push(
        <PaginationItem
          key={i}
          onClick={() => setPageNumber(i)}
          className={`cursor-pointer ${
            pageNumber === i ? "active" : ""
          } cursor-pointer`}
        >
          <PaginationLink isActive={isActive}>{i}</PaginationLink>
        </PaginationItem>
      );
    }
    return btns;
  };

  if (totalPage <= 1) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent>
        {pageNumber > 1 && (
          <PaginationItem
            className="cursor-pointer"
            onClick={() => setPageNumber(pageNumber - 1)}
          >
            <PaginationPrevious />
          </PaginationItem>
        )}

        {createBtn()}
        {pageNumber < totalPage && (
          <PaginationItem
            className="cursor-pointer"
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            <PaginationNext href="#" />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
