'use client';

import { PageTitle, Paragraph } from '@repo/ui/documents';
import Link from 'components/Wrappers/Link';
import { Button } from '@repo/ui/buttons';
import { toast } from 'sonner';
import axios from 'lib/axios';
import { useParams, useRouter } from 'next/navigation';
import { FormWrapper, SelectInput, TextInput } from '@repo/ui/forms';
import { useGetProduct } from '@hooks';
import { statusListOptions } from 'lib/list-options';
import { objKeysToNumber } from 'lib/utils';

export default function Page() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { data, mutate } = useGetProduct({
    id: params?.id,
  });
  console.log(data);

  async function submit(data: { [k: string]: FormDataEntryValue }) {
    try {
      if (!data?.id) {
        throw new Error('List ID is required');
      }

      await axios.post('/api/v1/products/update', {
        ...objKeysToNumber(['quantity', 'cost', 'price', 'reorderLevel'], data),
        id: params?.id,
      });
      toast.success('You have successfully updated the list.');
      mutate();
      router.back();
    } catch (error) {
      toast.error(
        (error as Error)?.message || 'An error occurred. Please try again.'
      );
    }
  }

  // delete the item
  async function deleteItem() {
    try {
      if (!data?.id) {
        throw new Error('List ID is required');
      }

      await axios.post('/api/v1/products/delete', {
        id: data?.id,
      });
      toast.success('You have successfully deleted the list.');
      router.back();
    } catch (error) {
      toast.error(
        (error as Error)?.message || 'An error occurred. Please try again.'
      );
    }
  }

  return (
    <section className="max-w-3xl mx-auto px-6 py-12 space-y-12">
      <PageTitle>Cluster ID: {params?.id}</PageTitle>
      <FormWrapper onSubmit={submit}>
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-12">
            <h2 className="text-base/7 font-semibold text-white">Cluster</h2>
            <p className="mt-1 text-sm/6 text-gray-400">
              Do Lorem labore amet commodo elit non incididunt nostrud eiusmod
              laborum labore.
            </p>

            <div className="mt-10 flex flex-col gap-8">
              <TextInput
                name="name"
                label="Name"
                placeholder="Enter a name"
                defaultValue={data?.name}
              />
              <TextInput
                name="description"
                label="Description"
                placeholder="Enter a description"
                defaultValue={data?.description}
                optional
              />
              <TextInput
                name="category"
                label="Category"
                placeholder="Enter a category"
                defaultValue={data?.category}
                optional
              />
              <TextInput
                name="quantity"
                label="Quantity"
                placeholder="Enter a quantity"
                type="number"
                defaultValue={data?.quantity?.toString()}
                optional
              />
              <TextInput
                name="cost"
                label="Cost"
                placeholder="Enter a cost"
                type="number"
                defaultValue={data?.cost?.toString()}
                optional
              />
              <TextInput
                name="price"
                label="Price"
                placeholder="Enter a price"
                type="number"
                defaultValue={data?.price?.toString()}
                optional
              />
              <TextInput
                name="reorderLevel"
                label="Reorder Level"
                placeholder="Enter a reorder level"
                type="number"
                defaultValue={data?.reorderLevel?.toString()}
                optional
              />
              <SelectInput
                name="status"
                optional
                label="Status"
                defaultValue={data?.status || 'ACTIVE'}
                options={statusListOptions}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-4">
          <Button
            type="button"
            variant="link"
            className="text-sm/6 font-semibold text-white"
            LinkComponent={Link}
            href="/dashboard/products"
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Update
          </Button>
          <Button type="button" variant="danger" onClick={deleteItem}>
            Delete
          </Button>
        </div>
      </FormWrapper>
      <Paragraph>
        *Exercitation ullamco est fugiat aliqua voluptate velit nostrud
        cupidatat consequat sunt veniam excepteur anim nisi. Do nostrud eu
        consequat et sit ut enim in anim quis exercitation officia. Adipisicing
        sint minim ex id ex. Excepteur duis consectetur ad veniam exercitation
        fugiat elit mollit. Nostrud consectetur deserunt esse quis dolore amet
        fugiat sint veniam nostrud voluptate non. Lorem et dolore sit voluptate.
        Aute irure aliquip do adipisicing laborum irure deserunt Lorem
        consectetur id. Velit aute ea sint commodo ea qui Lorem. Cupidatat
        cupidatat aute excepteur anim quis eu ex voluptate adipisicing cillum.
        Esse culpa culpa amet dolor reprehenderit dolore consequat. Aliquip
        nostrud do exercitation enim non amet in. Et aliqua dolore voluptate
        elit proident. Deserunt magna fugiat ea nostrud qui culpa ullamco est
        nisi Lorem sit. Ipsum est sit magna incididunt esse elit in sunt ex
        veniam ullamco exercitation exercitation duis. Aliquip reprehenderit
        excepteur qui ex deserunt cupidatat magna do velit nostrud elit non
        veniam nisi. Non id qui sunt nulla tempor occaecat ut nostrud Lorem.
        Labore quis anim officia do sint fugiat irure.
      </Paragraph>
    </section>
  );
}
