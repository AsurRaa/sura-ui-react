# Example in product category

```ts
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, message, Row, Tag } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import AsurRaaTable, {
  AsurRaaColumnsInterface,
} from "../../components/asurraa-table/AsurRaaTable";
import {
  deleteProductServiceCategory,
  postProductServiceCategory,
  ProductCategoryInterface,
  refreshProductServicesCategory,
  useGetAllProductCategory,
} from "../../services/product-category.service";
import { InputHeader } from "../../styles/common.style";

const ProductCategoryPage = () => {
  const [page, setPage] = useState<number>(1);
  const { category, meta, isLoading, data } = useGetAllProductCategory(page);
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const { control, handleSubmit, reset, errors } = useForm();
  const [refreshAnimated, setRefreshAnimated] = useState<boolean>(false);


  const onSubmit = (data: any) => {
    postProductServiceCategory(data)
      .then((res) => {
        message.success("Success");
      })
      .catch((err) => {
        message.error(err.messaage);
      })
      .finally(() => {
        setOpenCreateModal(false);
        reset();
      });
  };
  return (
    <div>
      <Modal
        centered={true}
        title="Create Product"
        visible={openCreateModal}
        onCancel={() => {
          setOpenCreateModal(false);
          reset();
        }}
        onOk={handleSubmit(onSubmit)}
      >
        <div>
          <form>
            <Controller
              name="category"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <div>
                  <InputHeader>Category Name</InputHeader>
                  <Input onChange={onChange} value={value} allowClear />
                  <p>{errors.category}</p>
                </div>
              )}
            />
          </form>
        </div>
      </Modal>
      <AsurRaaTable
        antdTableProps={{
          bordered: true,
          loading: isLoading,
          pagination: {
            onChange: (page) => {
              setPage(page);
            },
            pageSize: 10,
            total: meta?.totalItems,
            current: page,
          },
        }}
        createButton={{
          onClick: () => setOpenCreateModal(true),
        }}
        refreshButton={{
          animate: refreshAnimated,
          onClick: () =>
            refreshProductServicesCategory({ page: page })
              .then(() => {
                setRefreshAnimated(true);
              })
              .catch(() => {
                setRefreshAnimated(true);
              })
              .finally(() => {
                setRefreshAnimated(false);
              }),
        }}
        deleteActionButton={(props) => ({
          onOk: () => {
            //console.log("table", props.id);
            deleteProductServiceCategory({
              id: props.id,
              page: page,
              swrData: category,
            })
              .then((res) => {
                message.success("Success");
              })
              .catch((err) => {
                message.error("Error", err.message);
              });
          },
        })}
        asurRaaColumnProps={column}
        data={category}
        dataCSV={category}
        renderOwnViewColumn={(props) => {
          return (
            <div>
              <Row gutter={16}>
                {props?.map((data, index) => {
                  return (
                    <Col key={index} span={8} style={{ paddingBottom: 10 }}>
                      <Card
                        title={<Tag>{data.id}</Tag>}
                        extra={
                          <DeleteOutlined
                            onClick={() => {
                              return deleteProductServiceCategory({
                                id: data.id,
                                swrData: data,
                                page: page,
                              })
                                .then((res) => {
                                  message.success("Success");
                                })
                                .catch((err) => {
                                  message.error("Error", err.message);
                                });
                            }}
                          />
                        }
                        bordered={true}
                      >
                        {data.category}
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </div>
          );
        }}
        renderMoreButtonHeader={<Button type="primary">Just Test</Button>}
      />
    </div>
  );
};

const column: Array<AsurRaaColumnsInterface<ProductCategoryInterface>> = [
  {
    title: "Category",
    width: 50,
    dataIndex: "category",
    key: "Category",
  },
];
export default ProductCategoryPage;

```