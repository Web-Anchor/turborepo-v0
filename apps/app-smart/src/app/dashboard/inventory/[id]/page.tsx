'use client';

import { PageTitle, Paragraph } from '@repo/ui/documents';
import Link from 'components/Wrappers/Link';
import { Button } from '@repo/ui/buttons';
import { toast } from 'sonner';
import axios from 'lib/axios';
import { useParams, useRouter } from 'next/navigation';
import { FormWrapper, TextInput } from '@repo/ui/forms';
import { useGetInventory } from 'hooks/inventories';
import { objKeysToNumber } from 'lib/utils';

export default function Page() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { data, mutate } = useGetInventory({ id: params?.id });

  async function submit(data: { [k: string]: FormDataEntryValue }) {
    try {
      if (!params?.id) {
        throw new Error('Inventory ID is required');
      }
      await axios.post('/api/v1/inventories/update', {
        ...objKeysToNumber(['quantity', 'price'], data),
        id: params?.id,
      });
      toast.success('You have successfully updated the inventory.');
      mutate();
      router.back();
    } catch (error) {
      toast.error(
        (error as Error)?.message || 'An error occurred. Please try again.'
      );
    }
  }

  return (
    <section className="max-w-3xl mx-auto px-6 py-12 space-y-12">
      <PageTitle>Inventory ID: {params?.id}</PageTitle>
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
                name="sku"
                label="SKU"
                placeholder="Enter a SKU"
                defaultValue={data?.sku}
                optional
              />
              <TextInput
                name="unit"
                label="Unit"
                placeholder="Enter a unit"
                defaultValue={data?.unit}
                optional
              />
              <TextInput
                name="quantity"
                type="number"
                label="Quantity"
                placeholder="Enter a quantity"
                defaultValue={data?.quantity?.toString()}
                optional
              />
              <TextInput
                name="supplier"
                label="Supplier"
                placeholder="Enter a supplier"
                defaultValue={data?.supplier}
                optional
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            type="button"
            variant="link"
            className="text-sm/6 font-semibold text-white"
            LinkComponent={Link}
            href="/dashboard/lists"
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Update
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
