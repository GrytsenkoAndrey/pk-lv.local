import { AbilityBuilder, Ability } from "@casl/ability";

const { can, cannot, build } = new AbilityBuilder(Ability);

// can('read', 'Post');
// cannont('delete', 'Post', { published: true });

export default build();
