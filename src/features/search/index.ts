import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { api } from "../../api/api";
import { ApiEndpoints, STORE_KEY } from "../../api/constants";
import { PagedResponse } from "../../models/response";
import { Dapp } from "../dapp/models/dapp";

interface ISearchDataSource {
	searchById;
	searchByPackageId;
}
// API calls for search and related things.
class SearchDataSource implements ISearchDataSource {
	registerEndpoints(this, api) {
		return api.injectEndpoints({
			endpoints: (build) => ({
				searchById: this.searchById(build),
				searchByPackageId: this.searchByPackageId(build),
			}),
		});
	}

	searchById(builder: EndpointBuilder<any, any, any>) {
		return builder.query<PagedResponse<Dapp>, string>({
			query: (appId) => `/dapp/search/${appId}?storeKey=${STORE_KEY}`,
		});
	}

	searchByPackageId(builder: EndpointBuilder<any, any, any>) {
		return builder.query<PagedResponse<Dapp>, Array<string>>({
			query: (pkgIds) =>
				`${ApiEndpoints.SEARCH_BY_PKG_ID}?packages=${pkgIds.join(",")}`,
		});
	}
}

export const searchDataSource = new SearchDataSource();

export const { useSearchByIdQuery, useSearchByPackageIdQuery } =
	searchDataSource.registerEndpoints(api);
