import { useEffect, useState } from 'react';
import api from '@/apis/config';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import StarRating from '@/components/common/StarRating';
import { AxiosResponse } from 'axios';

//내가 쓴 리뷰 리스트
const Review = (): React.ReactElement => {
  const [userId, setUserId] = useState<number>();
  const [itemData, setItemData] = useState<Review[]>([]);
  const router = useRouter();

  useEffect(() => {
    setUserId(
      Number.parseInt(localStorage.getItem('userId') as string),
    );
  }, []);

  useEffect(() => {
    if (userId !== null && userId !== undefined) {
      getItemData(userId).then((res: AxiosResponse) => {
        // API 응답의 데이터 구조에 대한 안전한 처리를 추가합니다.
        if (res?.data?.myReviewList) {
          setItemData(res.data.myReviewList);
        }
        console.log(res);
      });
    }
  }, [userId]);

  const getItemData = async (id: number): Promise<AxiosResponse> => {
    return await api.getReviewList(id);
  };

  const updateReview = (
    reviewId: number,
    reviewContent: string,
    reviewScore: number,
  ): void => {
    if (window.confirm('리뷰를 수정하시겠습니까?')) {
      try {
        if (userId !== undefined) {
          api.updateReview(
            userId,
            reviewId,
            reviewContent,
            reviewScore,
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        router.refresh();
      }
    }
  };
  const deleteReview = (reviewId: number): void => {
    if (window.confirm('리뷰를 제거하시겠습니까?')) {
      try {
        if (userId !== undefined) {
          api.deleteReview(userId, reviewId);
        }
      } catch (error) {
        console.log(error);
      } finally {
        router.refresh();
      }
    }
  };

  return (
    <div>
      <p className="ml-2 text-xl font-extrabold text-[#1E266E] mb-2">
        내가 쓴 리뷰
      </p>
      <div className="flex flex-col items-center w-[400px] bg-white shadow-lg text-xs font-base text-[#909090] rounded-md">
        <div id="item-list">
          {itemData.length !== 0 ? (
            itemData.map(
              (item: Review, index: number): React.ReactElement => (
                <div
                  id="item"
                  className="flex justify-start w-full my-4 min-h-28"
                  key={index}
                >
                  <div className="flex flex-col w-48">
                    <div id="item-img" className="mask mask-square">
                      <Image
                        src={item.nutrientImageUrl}
                        alt="item-img"
                        width={100}
                        height={100}
                        onClick={() =>
                          router.push(
                            `/pilldetail/pill-detail?id=${item.nutrientId}`,
                          )
                        }
                      />
                    </div>
                    <div
                      id="item-info"
                      className="flex flex-col items-center"
                    >
                      <span
                        id="manufacturer"
                        className="text-xs font-bold text-[#909090]"
                      >
                        {item.nutrientBrand}
                      </span>
                      <span
                        id="name"
                        className="text-sm font-extrabold text-[#3A3A3A]"
                      >
                        {item.nutrientName}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-around w-full m-2">
                    <div id="review" className="flex flex-col">
                      <span
                        id="review-content"
                        className="text-base font-base text-[#3A3A3A]"
                      >
                        {item.reviewContent}
                      </span>
                      <StarRating rating={item.reviewScore} />
                    </div>
                    <div
                      id="buttons"
                      className="flex justify-end space-x-1"
                    >
                      <button
                        id="update-btn"
                        className="btn btn-sm border-none text-[#909090] btn-outline"
                        onClick={() =>
                          updateReview(
                            item.reviewId,
                            item.reviewContent,
                            item.reviewScore,
                          )
                        }
                      >
                        수정
                      </button>
                      <button
                        id="delete-btn"
                        className="btn btn-sm border-none text-[#909090] btn-outline"
                        onClick={() => deleteReview(item.reviewId)}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              ),
            )
          ) : (
            <div className="my-2">
              <span>아직 작성한 리뷰가 없습니다.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;
